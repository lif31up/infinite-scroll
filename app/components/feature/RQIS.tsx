'use client';
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import React, {useCallback, useEffect, useRef, useState} from "react";
import Image from "next/image";
import "@/styles/RQIS.css";

const queryClient = new QueryClient();
export default function RQIS({src}:{src:string}){
	return(
	<QueryClientProvider client={queryClient}>
		<_RQIS src={src}/>
	</QueryClientProvider>
	);
}
// 리액트 쿼리에 사용될 패치함수를 정의합니다.
const fetcher = async (endpoint:string,index:number) => {
	if(index <= 0){//색인의 가장 처음 시작입니다. 이 과정에서 해당 요소는 서버의 상태를 확인합니다.
		const serverRes = await fetch(endpoint);
		const serverStat = await serverRes.json();
		if(serverStat.ok){return null;}
		else{throw new Error("Server-side Error");}
	}
	try {
		const response = await fetch([endpoint,index].join("/").trim());
		const data = await response.json();
		return data;
	}catch(error){return error;}
};
function _RQIS({src}:{src:string}){
	//latestIndex는 useQurey를 발화합니다.
	const [latestIndex,setLatestIndex] = useState(0);
	//change는 useCallback을 발화합니다.
	const [change,setChange] = useState(false);
	//uqeryStackRef는 스택을 저장합니다.
	const queryStackRef:any = useRef([]);
	const {data,isLoading,isError} = useQuery(["data",src,latestIndex],()=>fetcher(src,latestIndex),{
		onSuccess:(data)=>{
			if(data === null){return;}
			queryStackRef.current.push(<RQIS_ItemCard key={latestIndex} data={data}/>);
			setChange(!change);
		},
		onError:(error:Error)=>{
			console.log(error.message);
		},
		staleTime: 0,
	});
	//fetching이 성공할 때마다 새롭게 함수를 정의합니다. 이 함수는 infiniteScroller의 콜백 함수로 사용됩니다.
	const loadMore = useCallback(async ()=>{
		const new_latestIndex = latestIndex + 1;
		setLatestIndex(new_latestIndex);//색인을 갱신합니다.
	},[change]);
	return(
	<div className={"custom-RQIS"}>
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
	<div className={"custom-RQIS-item-card"}>
		<div className={"w-40 h-40 relative"}>
			<Image src={data.image} alt={data.title} layout={"fill"}/>
		</div>
		<div>
			<h1>{data.title}</h1>
			<p>{data.price.toString()}</p>
		</div>
	</div>
	);
}