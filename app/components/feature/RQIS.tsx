'use client';
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import React, {useCallback, useEffect, useRef, useState} from "react";

const queryClient = new QueryClient();
export default function RQIS({src}:{src:string}){
	return(
	<QueryClientProvider client={queryClient}>
		<_RQIS src={src}/>
	</QueryClientProvider>
	);
}
const fetcher = async (endpoint:string,index:number) => {
	try {
		const response = await fetch([endpoint,index].join("/").trim());
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error('Failed to fetch data');
	}
};
function _RQIS({src}:{src:string}){
	//latestIndex는 요청해야 할 물건의 색인입니다.
	const [latestIndex,setLatestIndex] = useState(0);
	const [onChange,setOnChange] = useState(false);
	const queryStackRef:any = useRef([]);
	const {data,isLoading,isError} = useQuery(["data",src,latestIndex],()=>fetcher(src,latestIndex),{
		onSuccess:(data)=>{
			queryStackRef.current.push(<RQIS_ItemCard key={latestIndex} data={data}/>);
			setOnChange(!onChange);
		}
	});

	const loadMore = useCallback(async ()=>{
		const new_latestIndex = latestIndex + 1; console.log(latestIndex);
		setLatestIndex(new_latestIndex);
	},[onChange]);

	return(
	<div className={""}>
		<div>{queryStackRef.current}</div>
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
function RQIS_ItemCard({data}:{data:any}){
	if(data === undefined){return(<></>);}
	return(
	<div className={"h-40"}>
		<h1>{data.title}</h1>
		<p>{data.price.toString()}</p>
	</div>
	);
}