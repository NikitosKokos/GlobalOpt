

document.body.onload = () => {
	setTimeout(() => {
	const preloader = document.querySelector('.preloader');
	if(!preloader.classList.contains('preloader__close')){
		preloader.classList.add('preloader__close');
		document.body.classList.remove('hidden');
	}
	},500);
	
	
};

// ibg class

function ibg(){

    let ibg=document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
    if(ibg[i].querySelector('img')){
    ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
    }
    }
    }
    
    ibg();

// ibg class end    


// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());

// menu-btn

const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
menuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    menuBtn.classList.toggle('menu-btn_active');
    nav.classList.toggle('nav_active');
});

// menu-btn end


let mySwiper = new Swiper ('.swiper-container', {
	slidesPerView: 1,
	centeredSlides: true,
	spaceBetween: 130,
	 navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  loop: true,
  breakpoints: {
	  768: {
		slidesPerView: 2,
	  },
	  1200: {
		slidesPerView: 3,
	  }
  }
  });

// MapBox

// mapboxgl.accessToken = 'pk.eyJ1IjoibmlraXRvc2tva29zIiwiYSI6ImNrY202OHFvdDAwNjkycXJ1dGhsbHh6M3gifQ.Vexdeh4-F-FCTNm-ohUfTA';
// let coordinat = [ 37.627219,55.747977];
// var map = new mapboxgl.Map({
// container: 'map',
// zoom: 15,
// center: coordinat,
// style: 'mapbox://styles/mapbox/satellite-v9'
// });
// // ../img/icons/MapMarker.png


// map.on('load', function() {
// 	map.loadImage(
// 	'../img/icons/MapMarker.png',
// 	function(error, image) {
// 	if (error) throw error;
// 	map.addImage('cat', image);
// 	map.addSource('point', {
// 	'type': 'geojson',
// 	'data': {
// 	'type': 'FeatureCollection',
// 	'features': [
// 	{
// 	'type': 'Feature',
// 	'geometry': {
// 	'type': 'Point',
// 	'coordinates': [ 37.627219,55.747977]
// 	}
// 	}
// 	]
// 	}
// 	});
// 	map.addLayer({
// 	'id': 'points',
// 	'type': 'symbol',
// 	'source': 'point',
// 	'layout': {
// 	'icon-image': 'cat',
// 	'icon-size': 1
// 	}
// 	});
// 	}
// 	);
// 	});
// 	new mapboxgl.Marker(map)
// 		.setLngLat(monument)
// 		.setPopup(popup) // sets a popup on this marker
// 		.addTo(map);
// 	var popup = new mapboxgl.Popup({ closeOnClick: false })
// 		.setLngLat([37.630000,55.747977])
// 		.setHTML(`
// 		<div class='city' >г. Москва</div> 
// 		<div class='street' >ул. Садовническая, дом 5, офис 4-6
// 		700 от м. Новокузнецкая<br>
// 		Тел: +7 (926) 423 01 00</div> 
// 		<a href='#' class='mail'>info@glopt.ru</a>
// 		`)
// 		.addTo(map);

mapboxgl.accessToken = 'pk.eyJ1IjoibmlraXRvc2tva29zIiwiYSI6ImNrY202OHFvdDAwNjkycXJ1dGhsbHh6M3gifQ.Vexdeh4-F-FCTNm-ohUfTA';
var monument = [ 37.627219,55.747977];
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [ 37.629000,55.747977],
zoom: 16
});
 
// create the popup.Popup({ offset: 0 })
var popup = new mapboxgl.Popup({closeButton: false, closeOnClick: false, offset: [350, 0], anchor: 'right' }).setHTML(`
 		<div class='city' >г. Москва</div> 
 		<div class='street' >ул. Садовническая, дом 5, офис 4-6
 		700 от м. Новокузнецкая<br>
 		Тел: +7 (926) 423 01 00</div> 
		<a href='#' class='mail'>info@glopt.ru</a>
		`)
		.setMaxWidth("300px").addTo(map);
 
// create DOM element for the marker
var el = document.createElement('div');
el.id = 'marker';
 
// create the marker
new mapboxgl.Marker(el)
.setLngLat(monument)
.setPopup(popup) 
.addTo(map);
// MApBox end


