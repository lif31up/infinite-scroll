'use client';
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import React, {MutableRefObject, useCallback, useEffect, useRef, useState} from "react";
import Image from "next/image";
import "@/styles/RQIS.css";
import IntersectionListener from "@/app/components/feature/IntersectionListener";
const queryClient = new QueryClient();
export default function RQInfiniteScroller({src}:{src:string}){
	return(
	<QueryClientProvider client={queryClient}>
		<InfiniteScroller src={src}/>
	</QueryClientProvider>
	);
}
// 리액트 쿼리에 사용될 패치함수를 정의합니다.
const fetcher = async (endpoint:string,index:number):Promise<number> => {//모든 정상 종료는 0 또는 자료을 반환합니다, 반면 비정상 종료는 1을 반환합니다.
	if(index < 0){return 1;}
	if(index === 0){//색인의 가장 처음 시작입니다. 이 과정에서 해당 요소는 서버의 상태를 확인합니다.
		const serverRes = await fetch(endpoint);
		const serverStat = await serverRes.json();
		if(serverStat.ok){return 0;}
		else{return 1;}
	}
	// 실제 무한 스크롤러의 루틴입니다.
	try {
		const response = await fetch([endpoint,index].join("/").trim());
		return await response.json();
	}
	catch(error){
		let message:string;
		if(error instanceof Error){message = error.message;}
		message = String(error);
		console.warn(message); return 1;
	}
};
function InfiniteScroller({src}:{src:string}){
	const [latestIndex,setLatestIndex] = useState(0); //latestIndex는 useQurey를 발화합니다.
	const [change,setChange] = useState(false); //change는 useCallback을 발화합니다.
	const queryStackRef:MutableRefObject<Array<React.ReactNode>> = useRef([]); //queryStackRef는 스택 형태의 자료 구조를 가집니다.
	const checkerRef:MutableRefObject<Array<string>> = useRef([]);
	const [error,setError] = useState(false);
	const {data,isLoading,isError} = useQuery(["data",src,latestIndex],()=>fetcher(src,latestIndex),{
		onSuccess:(data)=>{
			if(data === 1){setError(true); return 0;}
			let id = data.id;
			if(checkerRef.current.some((element)=>{return element === id;})){
				console.warn("fetched element already exists in stack.");
			}
			else{
				checkerRef.current.push(id); queryStackRef.current.push(<RQIS_ItemCard key={latestIndex} data={data}/>);
			}
			setChange(!change); return 0;
		},
		onError:(error:Error)=>{
			console.warn(error.message);
		},
		staleTime: 0,
	});
	const loadMore = useCallback(async ()=>{ //패칭이 성공할 때마다 새롭게 함수를 정의합니다. 이 함수는 infiniteScroller의 콜백 함수로 사용됩니다.
		const new_latestIndex = latestIndex + 1;
		setLatestIndex(new_latestIndex);
	},[change]);
	if(error){ window.location.reload(); }
	return(
	<div className={"custom-RQIS"}>
		<div>{queryStackRef.current}</div>
		<IntersectionListener loadMore={loadMore}/>
	</div>
	);
}
function RQIS_ItemCard({data}:{data:any}){
	if(data === undefined){return(<></>);}
	return(
	<div className={"custom-RQIS-item-card"}>
		<div className={"w-40 h-40 relative object-cover"}>
			<Image src={data.image} alt={data.title}
						 width={"1"} height={"1"} sizes={"150px"} className={"w-full h-full"}/>
		</div>
		<div>
			<h1>{data.title}</h1>
			<p>{data.price.toString()}</p>
		</div>
	</div>
	);
}