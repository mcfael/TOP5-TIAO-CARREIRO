FROM php:8.3-fpm

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    curl \
    git \
    libzip-dev \
    nginx \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY ./src /var/www

RUN cp /var/www/.env.example /var/www/.env

RUN composer install --working-dir=/var/www --no-dev --optimize-autoloader

RUN php /var/www/artisan key:generate

#COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
#COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443

CMD service nginx start && php-fpm
