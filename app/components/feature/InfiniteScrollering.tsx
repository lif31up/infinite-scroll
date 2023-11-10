'use client';
import React, {useCallback, useEffect, useRef, useState} from "react";
import Image from "next/image";
//다음의 코드는 JavaScript Fetch를 통한 무한스크롤링입니다. RQIS.tsx에는 리액트-쿼리를 이용해서 만든 무한스크롤링이 작성되어있습니다.
export default function InfiniteScrollTable({src}:{src:string}){
	const [latestIndexl,setLatestIndexl] = useState(1);//아이템의 색인값입니다. InfiniteScroller가 가시될 때마다 증가해야할 책임을 가집니다.
	const dataRef:React.MutableRefObject<Array<object>> = useRef([]);// 내려받은 자료를 저장하기 위한 참조입니다.

	// InfiniteScroller가 콜백할 함수를 정의하며, pageData가 변화할 때마다 새로운 색인값이 배정되어 정의됩니다.
	const loadMore = useCallback(async () => {
		const new_page = latestIndexl + 1;
		setLatestIndexl(new_page);
		let moreData:Response|null = await fetch([src,new_page].join("/").trim());
		let moreData_json:object|null = await moreData.json();
		if(moreData_json === null){return;}
		dataRef.current.push(moreData_json);
		return ()=>{moreData = null; moreData_json = null;};
	},[dataRef.current]);

	const products:Array<React.ReactNode> = [];
	// @ts-ignore
	dataRef.current.forEach(({title,image,price,category,description},index:number):void=>{
		products.push(
		<div key={index} className={"infinite-item-card"}>
			<div className={"w-full h-64 relative"}>
				<Image src={image} alt={title} layout={"fill"} objectPosition={"cover"} objectFit={"cover"}/>
			</div>
			<h1>{title}</h1>
			<p>{price}</p>
			<p>{category}</p>
			<p>{description}</p>
		</div>
		);
	});
	return(
	<div className={"w-full grid justify-items-center"}>
		<h1 className={"text-2xl w-fit my-8"}>{"Infinite Scroller"}</h1>
		<div className={"grid"}>{products}</div>
		<InfiniteScroller loadMore={loadMore}/>
	</div>
	);
}
function InfiniteScroller({loadMore}:{loadMore:any}){
	const observerRef:any = useRef(null);
	useEffect(()=>{
		const target:HTMLElement|null = document.getElementById("infinite-scroller");
		if(target === null){return;}
		const intersectionHandler = (entries:any)=>{
			entries.forEach((entry:any)=>{
				if(entry.isIntersecting){loadMore();}
			});
		}
		const options = {root: null, rootMargin:"0px",threshold: 1}
		observerRef.current = new IntersectionObserver(intersectionHandler,options);
		observerRef.current.observe(target);
		return ()=>{observerRef.current.disconnect();};
	},[loadMore]);
	return(<div className={"w-fill h-4 bg-black"} id={"infinite-scroller"}/>);
}