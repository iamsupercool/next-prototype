import RegisterForm from '@/components/auth/register-form';

export default function RegisterPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">JS NEXT</h1>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
