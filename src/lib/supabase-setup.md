
# Guia de Implementação do Supabase

## Configuração Inicial

A aplicação LEX+ENERGIA já está configurada para se conectar ao Supabase. O cliente do Supabase está definido em `src/lib/supabase.ts` com as seguintes credenciais:

```typescript
const supabaseUrl = 'https://jhdvbtjavncmvmavdljx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoZHZidGphdm5jbXZtYXZkbGp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1NTU5MzIsImV4cCI6MjAyMjEzMTkzMn0.DVtRwaSSKRPrEePLrFpYwfSrvOVNJ3L8l_5a4g5X7L8';
```

## Estrutura de Tabelas Necessárias

Para que o sistema funcione corretamente, você precisa criar as seguintes tabelas no Supabase:

### 1. Tabela `indicadores`

```sql
CREATE TABLE indicadores (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    telefone TEXT,
    cpf TEXT UNIQUE,
    cnpj TEXT UNIQUE,
    data_cadastro TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'ativo',
    comissao_total NUMERIC DEFAULT 0,
    indicacoes_total INTEGER DEFAULT 0,
    chave_pix TEXT,
    avatar_url TEXT
);
```

### 2. Tabela `gestores`

```sql
CREATE TABLE gestores (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    telefone TEXT,
    cargo TEXT,
    nivel_acesso TEXT NOT NULL DEFAULT 'padrão',
    data_cadastro TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'ativo',
    avatar_url TEXT
);
```

### 3. Tabela `leads`

```sql
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    indicador_id UUID NOT NULL REFERENCES indicadores(id),
    tipo TEXT NOT NULL CHECK (tipo IN ('pf', 'pj')),
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT NOT NULL,
    cpf TEXT,
    cnpj TEXT,
    razao_social TEXT,
    inscricao_estadual TEXT,
    cep TEXT,
    endereco TEXT,
    cidade TEXT,
    estado TEXT,
    valor_fatura NUMERIC,
    fatura_url TEXT,
    status TEXT DEFAULT 'pendente',
    data_indicacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    gestor_id UUID REFERENCES gestores(id),
    observacoes TEXT,
    comissao_esperada NUMERIC,
    comissao_paga NUMERIC DEFAULT 0,
    data_pagamento TIMESTAMP WITH TIME ZONE
);
```

### 4. Tabela `comissoes`

```sql
CREATE TABLE comissoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    indicador_id UUID NOT NULL REFERENCES indicadores(id),
    lead_id UUID NOT NULL REFERENCES leads(id),
    valor NUMERIC NOT NULL,
    status TEXT DEFAULT 'pendente',
    data_calculo TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_pagamento TIMESTAMP WITH TIME ZONE,
    comprovante_url TEXT
);
```

## Políticas de Segurança (RLS)

Para garantir a segurança dos dados, configure as seguintes políticas RLS:

### 1. Políticas para `indicadores`

```sql
-- Permitir que usuários leiam seu próprio perfil
CREATE POLICY "Indicadores podem ver seu próprio perfil" ON indicadores
    FOR SELECT USING (auth.uid() = id);

-- Permitir que gestores vejam todos os indicadores
CREATE POLICY "Gestores podem ver todos os indicadores" ON indicadores
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM gestores WHERE id = auth.uid()
        )
    );
```

### 2. Políticas para `leads`

```sql
-- Indicadores só podem ver seus próprios leads
CREATE POLICY "Indicadores veem apenas seus próprios leads" ON leads
    FOR SELECT USING (indicador_id = auth.uid());

-- Indicadores só podem inserir leads associados a eles mesmos
CREATE POLICY "Indicadores só inserem seus próprios leads" ON leads
    FOR INSERT WITH CHECK (indicador_id = auth.uid());

-- Gestores podem ver todos os leads
CREATE POLICY "Gestores podem ver todos os leads" ON leads
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM gestores WHERE id = auth.uid()
        )
    );

-- Gestores podem atualizar leads
CREATE POLICY "Gestores podem atualizar leads" ON leads
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM gestores WHERE id = auth.uid()
        )
    );
```

### 3. Políticas para `comissoes`

```sql
-- Indicadores só podem ver suas próprias comissões
CREATE POLICY "Indicadores veem apenas suas comissões" ON comissoes
    FOR SELECT USING (indicador_id = auth.uid());

-- Gestores podem ver e gerenciar todas as comissões
CREATE POLICY "Gestores podem gerenciar comissões" ON comissoes
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM gestores WHERE id = auth.uid()
        )
    );
```

## Configuração do Storage

Para armazenar faturas e outros documentos:

1. Crie um bucket chamado `faturas` para armazenar os arquivos de faturas
2. Configure as políticas de acesso:

```sql
-- Permitir aos indicadores fazer upload de suas próprias faturas
CREATE POLICY "Indicadores podem fazer upload" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'faturas' AND
        auth.uid() = (storage.fspath(name)::text)::uuid
    );

-- Permitir aos indicadores ver suas próprias faturas
CREATE POLICY "Indicadores podem ver suas faturas" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'faturas' AND
        auth.uid()::text = SPLIT_PART(storage.fspath(name), '/', 1)
    );

-- Permitir aos gestores ver todas as faturas
CREATE POLICY "Gestores podem ver todas as faturas" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'faturas' AND
        EXISTS (
            SELECT 1 FROM gestores WHERE id = auth.uid()
        )
    );
```

## Configuração de Autenticação

1. Acesse o painel do Supabase e vá para a seção "Authentication"
2. Configure as opções de e-mail:
   - Habilite o "Confirm email" para exigir confirmação de e-mail durante o registro
   - Configure o "Site URL" para seu domínio
   - Personalize os templates de e-mail para manter a identidade visual da sua marca

3. Crie a função para atribuir o papel correto aos usuários:

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM gestores WHERE id = NEW.id) THEN
    NEW.raw_app_meta_data := jsonb_set(NEW.raw_app_meta_data, '{role}', '"gestor"');
  ELSE
    NEW.raw_app_meta_data := jsonb_set(NEW.raw_app_meta_data, '{role}', '"indicador"');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

## Próximos Passos

1. Acesse o painel do Supabase (https://app.supabase.com)
2. Selecione seu projeto
3. Execute os scripts SQL para criar as tabelas e políticas
4. Configure as opções de autenticação
5. Crie o bucket de storage para armazenamento de arquivos

Depois de configurar o Supabase, o aplicativo estará pronto para usar autenticação real, armazenamento de dados e gestão de permissões.
