#!/bin/bash

# Espera o banco de dados ficar disponível
/wait-for-it.sh mysql:3306 --timeout=30 --strict -- echo "MySQL está pronto!"

# Executa as migrações
php artisan migrate --force

# Executa os seeders
php artisan db:seed --force

# Sobe o servidor Laravel
php artisan serve --host=0.0.0.0 --port=8000
