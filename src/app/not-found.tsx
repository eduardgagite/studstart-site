import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 pt-10 pb-10 text-center">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-muted">404</p>
        <h1 className="text-3xl font-semibold">Страница потерялась в горах</h1>
        <p className="text-muted">
          Такой страницы нет, но можно вернуться на главную и найти нужное.
        </p>
      </div>
      <Button href="/" variant="primary">
        На главную
      </Button>
    </div>
  );
}
