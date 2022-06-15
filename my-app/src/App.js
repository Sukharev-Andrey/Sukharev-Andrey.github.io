import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const ChartComponent = props => {
	const	lineColor = '#2962FF';
	const	areaTopColor = '#2962FF';
	const	areaBottomColor = 'rgba(41, 98, 255, 0.28)';
	const chartContainerRef = useRef();

	useEffect(
		() => {
			const {
				ThemeParams: {
					bg_color,
					text_color,
				}
			} = window.Telegram ? window.Telegram.WebApp : {
				ThemeParams: {
					bg_color: 'white',
					text_color: 'black',
				}
			};

			const handleResize = () => {
				chart.applyOptions({ 
					width: chartContainerRef.current.clientWidth,
					height: chartContainerRef.current.clientHeight,
				});
			};

			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: bg_color },
					textColor: text_color,
				},
				priceScale: { scaleMargins: { top: 0.2, bottom: 0.05,}},
				width: chartContainerRef.current.clientWidth,
				height: chartContainerRef.current.clientHeight,
				//height: "500",
			});
			chart.timeScale().fitContent();

			const newSeries = chart.addCandlestickSeries({ 
				lineColor, 
				topColor: areaTopColor, 
				bottomColor: areaBottomColor,
				upColor: '#26a69a', 
				downColor: '#ef5350',
				borderVisible: true,
			});

			newSeries.setData(data);

			// newSeries.setMarkers([
			// 	{
			// 		text: 'test',
			// 		time: '2017-04-09',
			// 		position: 'aboveBar',
			// 		color: 'black',
			// 		shape: 'arrowDown',
			// 	}
			// ]);

			// let pl = newSeries.createPriceLine({
			// 	price: 0,
			// 	color: 'green',
			// 	lineWidth: 2,
			// 	axisLabelVisible: true,
			// 	title: 'price',
			// });

			let i = 10;

			let last_close = 10;

			setInterval(() => {
				const open = last_close;
				const high = open + (Math.floor(Math.random() * 8) - 4);
				const low = open + (Math.floor(Math.random() * 8) - 4);
				const close = open + (Math.floor(Math.random() * 8) - 4);

				last_close = close;

				//pl.price = price;
				// pl.applyOptions({
				// 	price,
				// });

				newSeries.update({
					time: i,
					open,
					high,
					low,
					close,
				});

				i+=86400;

				//chart.timeScale().scrollToRealTime();
			}, 1000);
			

			// newSeries.update({
			// 	time: '11',
			// 	value: 11.11,
			// });

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		//[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	const st = { height: '100vh', width: '100%' };

	return (
		<div style={ st }
			ref={chartContainerRef}
		/>
	);
};

let data = [{ open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1 }, { open: 9.55, high: 10.30, low: 9.42, close: 9.94, time: 2 }, { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 3 }, { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 4 }, { open: 9.51, high: 10.46, low: 9.10, close: 10.17, time: 5 }, { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 6 }, { open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: 7 }, { open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: 8 }, { open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: 9 }, { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 10 }];

// const data = [
// 	{ time: '2018-12-22', value: 32.51 },
// 	{ time: '2018-12-23', value: 31.11 },
// 	{ time: '2018-12-24', value: 27.02 },
// 	{ time: '2018-12-25', value: 27.32 },
// 	{ time: '2018-12-26', value: 25.17 },
// 	{ time: '2018-12-27', value: 28.89 },
// 	{ time: '2018-12-28', value: 25.46 },
// 	{ time: '2018-12-29', value: 23.92 },
// 	{ time: '2018-12-30', value: 22.68 },
// 	{ time: '2018-12-31', value: 22.67 },
// ];

function App() {
  return (
    <ChartComponent></ChartComponent>
  );
}

export default App;
