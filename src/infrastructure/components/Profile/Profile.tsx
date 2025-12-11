import { FC } from 'react';
import { useUser } from '../../../context/UserContext';
import { getMultiplicationStats } from '../../../services/localStorage.service';

export const Profile: FC = () => {
  const { user } = useUser();
  const stats = getMultiplicationStats();

  return (
    <main className="flex-1 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-second border-2 border-main shadow-main rounded-lg p-6 md:p-8">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-main mb-2">Mi Perfil</h1>
            <p className="text-xl text-main">
              Bienvenido/a, <span className="font-bold">{user?.username}</span>
            </p>
          </header>

          <section>
            <h2 className="text-2xl font-bold text-main mb-4">
              Tablas de Multiplicar Completadas
            </h2>

            {stats.length === 0 ? (
              <div className="bg-white border-2 border-main rounded-lg p-8 text-center">
                <p className="text-main text-lg">
                  Aún no has completado ninguna tabla de multiplicar.
                </p>
                <p className="text-main mt-2">
                  ¡Comienza a practicar para ver tus estadísticas aquí!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {stats.map(({ tableNumber, completed }) => (
                  <div
                    key={tableNumber}
                    className="bg-main text-second border-2 border-second rounded-lg p-4 text-center hover:bg-second hover:text-main hover:border-main transition-colors duration-200"
                  >
                    <div className="text-lg font-semibold mb-1">
                      Tabla del {tableNumber}
                    </div>
                    <div className="text-2xl font-bold">{completed}</div>
                    <div className="text-sm">{completed === 1 ? 'vez' : 'veces'}</div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="mt-8 bg-white border-2 border-main rounded-lg p-6">
            <h3 className="text-xl font-bold text-main mb-3">Resumen</h3>
            <div className="space-y-2 text-main">
              <p>
                <span className="font-semibold">Total de tablas practicadas:</span>{' '}
                {stats.length}
              </p>
              <p>
                <span className="font-semibold">Total de completaciones:</span>{' '}
                {stats.reduce((acc, curr) => acc + curr.completed, 0)}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
