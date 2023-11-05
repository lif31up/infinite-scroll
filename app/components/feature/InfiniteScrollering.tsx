'use client';//CSR
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import React, {useCallback, useEffect, useRef, useState} from "react";
import Image from "next/image";
const queryClient = new QueryClient();

export default function InfiniteScrollTable({src}:{src:string}){
	return(
	<QueryClientProvider client={queryClient}>
		<RQInfiniteScrollTable src={[src].join("/").trim()}/>
	</QueryClientProvider>
	);
}
interface productType{
	title:string,image:string,price:number,category:string,description:string,
}
function RQInfiniteScrollTable({src}:{src:string}){
	const [page,setPage] = useState(1);
	const [pageData,setPageData]:[pageData:Array<object>,setPageData:any] = useState([]);

	const loadMore = useCallback(async () => {
		const new_page = page + 1;
		setPage(new_page);
		const buffer: Array<object> = [...pageData];
		const moreData = await fetch([src,new_page].join("/").trim());
		const moreData_json = await moreData.json();
		buffer.push(moreData_json);
		setPageData(buffer);
	},[pageData]);

	const products:Array<React.ReactNode> = [];
	// @ts-ignore
	pageData.forEach(({title,image,price,category,description},index):void=>{
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