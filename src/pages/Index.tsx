
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

const Index = () => {
  const handleWelcome = () => {
    toast("Bem-vindo ao modo padrão!", {
      description: "O aplicativo está configurado em modo padrão.",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b py-4 px-6 bg-card">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Meu Aplicativo</h1>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Modo Padrão</CardTitle>
              <CardDescription>O modo padrão está ativado</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Esta aplicação está configurada com o tema e configurações padrão do sistema.
              </p>
              <Button onClick={handleWelcome}>Confirmar</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recursos</CardTitle>
              <CardDescription>Funcionalidades disponíveis</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Layout responsivo</li>
                <li>Tema padrão</li>
                <li>Componentes shadcn/ui</li>
                <li>Toasts de notificação</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Começar</CardTitle>
              <CardDescription>Próximos passos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Personalize o conteúdo da aplicação conforme suas necessidades.
              </p>
              <Button variant="outline" className="w-full">
                Documentação
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="border-t py-6 bg-muted/50">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2025 Meu Aplicativo. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
