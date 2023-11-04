'use client';//CSR
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import {useCallback, useEffect, useRef, useState} from "react";
const queryClient = new QueryClient();
export default function InfiniteScrollTable({src}:{src:string}){
	return(
	<QueryClientProvider client={queryClient}>
		<RQInfiniteScrollTable src={[src].join("/").trim()}/>
	</QueryClientProvider>
	);
}

function RQInfiniteScrollTable({src}:{src:string}){
	const [page,setPage] = useState(1);
	const [pageData,setPageData] = useState([]);
	// @ts-ignore
	const loadMore = useCallback(()=>{
		const new_page = page + 1;
		setPage(new_page);
		const buffer = [...pageData];
		buffer.push(
		// @ts-ignore
		<div className={"h-40 w-full bg-purple-700 my-4 p-4"}>
			<h1 className={"text-2xl"}>{page.toString()}</h1>
			<p>{"this is items"}</p>
		</div>
		);
		setPageData(buffer);
	},[pageData,page]);
	return(
	<div className={"w-full"}>
		<div>{pageData}</div>
		{/*스크롤러가 비정삭적으로 리렌더되는 것을 막기위해 관계를 분리합니다.*/}
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