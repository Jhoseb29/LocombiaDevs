export const producthtml = (gameimgurl,gamename,gameprice,num,quantity) =>{ let template = `<div class="product" id="producto-${num}">
<img src="${gameimgurl}" alt="img-product" id="product_imgurl">
<div class="product_infot_container">
    <p class="title">${gamename}</p>
    <p class="key-type">Key</p>
</div>
<div class="add-product">
    <p class="products-number" id="products-number">${quantity}</p>
    <div>
        <button class="add">
            <svg width="47" height="20" viewBox="0 0 47 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M46.4197 19.7281L23.5165 0.0967407L0.613281 19.7281H46.4197Z" fill="#393939"/>
            </svg>
        </button>
        <button class="remove">
            <svg width="47" height="20" viewBox="0 0 47 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M46.4197 0.271864L23.5165 19.9032L0.613281 0.271864H46.4197Z" fill="#393939"/>
            </svg>
        </button>
    </div>
</div>
<p class="price">$${(gameprice*quantity).toFixed(2)}</p>
<button class="delete-product">
    <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <rect x="0.644531" y="0.225769" width="57.2581" height="57.2581" fill="url(#pattern0)"/>
    <defs>
    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
    <use xlink:href="#image0_3_76" transform="scale(0.01)"/>
    </pattern>
    <image id="image0_3_76" width="100" height="100" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAADHklEQVR4nO3dzUobYRjF8fOkEzdtBRfNolVwHzdtCCHmDkTwBuyurSK9jt5BbSWUQtsr6Ae9ABeZEOOmTbeKWlw32o0h83SjEIKFdvJOctTzAyHvMHnmlT8TMC4GEBERSccmvYG/KRaLU9PT088ArAJYAHB7xJG/3f2bmX3odrv1TqdzNvouw6MMUqvV7idJ8hnAw4wusRtF0fL29vZxRvNTy016A8OKxeJUxjEA4FG/3/9UKpXyGV4jFbog5x9TWcYAALh7KZ/PP8n6Ov8rmvQGLrE6tP4CYK3RaPwcZWilUpk1sy0zW7o4ZmaPAbwaZW5odHcIgOLgIkmS9VFjAECz2Tzq9/vrQ4cXRp0bGmOQO4OLZrN5FGpwq9U6HDp0N9TsUBiD3GgKQkZByKT+w7BWqy0lSfISwHzA/VwH++6+Ecfx1zRvTn2HuPtrKMZl5s2snvbN+sgikzpIkiRrAPYC7uW62AOQ+huAYF8uVqtVH1w3Gg3KLy5Dyer31UcWGQUhoyBkFISMgpBREDIKQkZByCgIGbr/qS8uLq64ex2Au/vTOI4/TvL8caO7Q9x9E8A9AAUz25z0+eNGFwTA/YHXDwjOHyvGIDeagpBREDIKQkZByCgIGQUhoyBkFISMgpBREDIKQkZByCgIGQUhoyBkFISMgpBREDIKQkZByCgIGQUhoyBkFISMgpBREDIKQkZByCgIGQUhoyBkFISMgpBREDIKQkZByCgIGQUhoyBkFISMgpBREDIKQkZByCgIGQUhoyBkFIQMY5D9gdf/8jiMrM8fK7og7r4B4Oj8Z2PS54+bnh+Skp4fckMoCBkFIaMgZBSEjIKQURAyIYOcDC4qlcpswNlUyuXy3NChk0tPTCFkkB+DCzPbuo5RyuXyXBRFW0OHv4eaH/L5Ie8BVC4WZrZkZofVajXgJTi5+7tQs4LdId1utw5gN9S8K6TV6/XehBoWLEin0zmLomjZzNqhZl4BO1EUrbTb7V6ogbdCDQKAg4OD00Kh8DaXyx2b2QyAGQBTIa9B4BTAjru/6PV6z+M4/jXpDYmIiADAH5sq34HRT4luAAAAAElFTkSuQmCC"/>
    </defs>
    </svg>
</button>
</div>`

return template
}