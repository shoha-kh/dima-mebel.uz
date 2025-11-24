# Руководство по добавлению постов в галерею

## Структура постов

Теперь галерея работает как "посты" - каждый пост это группа фотографий одного изделия.

### Особенности:
- **Автоматическая смена превью**: Фотографии в карточке меняются каждые 2 секунды
- **Модалка для детального просмотра**: При клике открывается модальное окно с фотографиями в высоком разрешении
- **Навигация внутри поста**: В модалке можно листать все фотографии данного изделия
- **Счетчик фотографий**: На карточке показывается количество фото

---

## Как добавить новый пост

### Шаблон поста:

```html
<!-- Post: Название изделия (Категория) -->
<div class="gallery-post" data-category="kitchen">
    <div class="post-preview">
        <div class="post-slideshow">
            <img src="URL-превью-1.jpg" alt="Описание - вид 1" loading="lazy">
            <img src="URL-превью-2.jpg" alt="Описание - вид 2" loading="lazy">
            <img src="URL-превью-3.jpg" alt="Описание - вид 3" loading="lazy">
        </div>
        <div class="post-info">
            <span class="photo-count">3 фото</span>
        </div>
    </div>
    <div class="post-hidden-images" style="display: none;">
        <a href="URL-полный-размер-1.jpg" class="glightbox" data-gallery="post-X" data-glightbox="type: image"></a>
        <a href="URL-полный-размер-2.jpg" class="glightbox" data-gallery="post-X" data-glightbox="type: image"></a>
        <a href="URL-полный-размер-3.jpg" class="glightbox" data-gallery="post-X" data-glightbox="type: image"></a>
    </div>
</div>
```

---

## Параметры

### 1. data-category (обязательно)
Категория для фильтрации:
- `kitchen` - Кухни
- `soft` - Мягкая мебель
- `wardrobe` - Шкафы
- `all` - Показывать во всех категориях

### 2. post-slideshow (превью)
Маленькие изображения для показа в карточке (800x600px рекомендуется)
- Автоматически меняются каждые 2 секунды
- Минимум 1 изображение, рекомендуется 2-4

### 3. photo-count
Обновите число фотографий:
```html
<span class="photo-count">5 фото</span>
```

### 4. data-gallery (важно!)
Каждый пост должен иметь уникальное значение:
- `data-gallery="post-1"` для первого поста
- `data-gallery="post-2"` для второго поста
- и так далее...

Это позволяет листать фотографии только внутри одного поста.

### 5. post-hidden-images
Полноразмерные изображения для модалки (1200px+ рекомендуется)
- Скрыты до открытия модалки
- Показываются в высоком разрешении при клике

---

## Примеры

### Пример 1: Кухня с 3 фотографиями

```html
<div class="gallery-post" data-category="kitchen">
    <div class="post-preview">
        <div class="post-slideshow">
            <img src="kitchen-preview-1.jpg" alt="Кухня - вид 1" loading="lazy">
            <img src="kitchen-preview-2.jpg" alt="Кухня - вид 2" loading="lazy">
            <img src="kitchen-preview-3.jpg" alt="Кухня - вид 3" loading="lazy">
        </div>
        <div class="post-info">
            <span class="photo-count">3 фото</span>
        </div>
    </div>
    <div class="post-hidden-images" style="display: none;">
        <a href="kitchen-full-1.jpg" class="glightbox" data-gallery="post-7" data-glightbox="type: image"></a>
        <a href="kitchen-full-2.jpg" class="glightbox" data-gallery="post-7" data-glightbox="type: image"></a>
        <a href="kitchen-full-3.jpg" class="glightbox" data-gallery="post-7" data-glightbox="type: image"></a>
    </div>
</div>
```

### Пример 2: Диван с 5 фотографиями

```html
<div class="gallery-post" data-category="soft">
    <div class="post-preview">
        <div class="post-slideshow">
            <img src="sofa-preview-1.jpg" alt="Диван - вид 1" loading="lazy">
            <img src="sofa-preview-2.jpg" alt="Диван - вид 2" loading="lazy">
            <img src="sofa-preview-3.jpg" alt="Диван - вид 3" loading="lazy">
            <img src="sofa-preview-4.jpg" alt="Диван - вид 4" loading="lazy">
            <img src="sofa-preview-5.jpg" alt="Диван - вид 5" loading="lazy">
        </div>
        <div class="post-info">
            <span class="photo-count">5 фото</span>
        </div>
    </div>
    <div class="post-hidden-images" style="display: none;">
        <a href="sofa-full-1.jpg" class="glightbox" data-gallery="post-8" data-glightbox="type: image"></a>
        <a href="sofa-full-2.jpg" class="glightbox" data-gallery="post-8" data-glightbox="type: image"></a>
        <a href="sofa-full-3.jpg" class="glightbox" data-gallery="post-8" data-glightbox="type: image"></a>
        <a href="sofa-full-4.jpg" class="glightbox" data-gallery="post-8" data-glightbox="type: image"></a>
        <a href="sofa-full-5.jpg" class="glightbox" data-gallery="post-8" data-glightbox="type: image"></a>
    </div>
</div>
```

---

## Рекомендации по фотографиям

### Размеры изображений:
- **Превью (post-slideshow)**: 800x600px или 16:9 соотношение
- **Полный размер (post-hidden-images)**: 1200px+ ширина

### Оптимизация:
- Сжимайте изображения перед загрузкой
- Используйте форматы JPEG для фото
- WebP для лучшего сжатия (если поддерживается)

### Количество фото в посте:
- Рекомендуется: 2-5 фотографий на изделие
- Показывайте изделие с разных ракурсов
- Включайте детали (фурнитура, материалы)

---

## Порядок действий при добавлении нового поста

1. **Подготовьте фотографии** одного изделия (с разных сторон)
2. **Определите категорию** (kitchen/soft/wardrobe)
3. **Загрузите изображения** на сервер
4. **Скопируйте шаблон** поста
5. **Замените URL** на ваши изображения
6. **Обновите data-gallery** (post-9, post-10, и т.д.)
7. **Укажите количество фото** в photo-count
8. **Добавьте пост** в галерею внутри `<div class="gallery-posts">`

---

## Как работает система

### До открытия модалки:
- В карточке показываются превью (маленькие изображения)
- Они автоматически меняются каждые 2 секунды
- Счетчик показывает количество доступных фото

### При клике на карточку:
- Открывается модальное окно (GLightbox)
- Показываются полноразмерные изображения
- Можно листать фото стрелками или свайпом
- Фотографии листаются только внутри этого поста

### Навигация:
- **Стрелки влево/вправо** - следующее/предыдущее фото в посте
- **ESC или крестик** - закрыть модалку
- **Клик вне изображения** - закрыть модалку

---

## Структура в index.html

Найдите секцию галереи:
```html
<div class="gallery-posts">
    <!-- Здесь все посты -->
</div>
```

Добавляйте новые посты внутри этого блока.

---

## Вопросы?

Если нужна помощь с добавлением постов, обратитесь к разработчику.
