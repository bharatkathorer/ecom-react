import {ReactElement, useEffect, useRef, useState} from "react";
import LoadingComponent from "./LoadingComponent.tsx";

type Props = {
    apiMethod: (page: number) => Promise<any>;
    children?: ReactElement,
    setItems: (items: any[]) => void
}
const InfinityScrollComponent = ({apiMethod, children, setItems}: Props) => {

    const [data, setData] = useState<any>([]); // Store all collected data
    const [currentPage, setCurrentPage] = useState<any>(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useRef<HTMLDivElement | null>(null);

    // Fetch data
    const fetchData = async (page: number) => {
        if (loading || !hasMore) return; // Prevent duplicate calls
        setLoading(true);
        try {
            const response: any = await apiMethod(page);
            const newItems = response.data.data || [];
            setData((prev: any) => [...prev, ...newItems]); // Merge new data
            setHasMore(newItems.length > 0); // Check if more data exists
        } catch (error) {
            setHasMore(false);
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Load more when reaching bottom
    const loadMore = () => {
        if (!hasMore) return;
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        fetchData(nextPage);
    };

    // Observe last element for infinite scroll
    useEffect(() => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                loadMore();
            }
        });

        if (lastElementRef.current) observer.current.observe(lastElementRef.current);
    }, [loading, hasMore]);

    // Initial fetch
    useEffect(() => {
        fetchData(currentPage);
    }, []);

    useEffect(() => {
        setItems && setItems(data);
    }, [data]);
    return (
        <>
            {children && children}
            <div ref={lastElementRef}></div>
            {loading && <LoadingComponent/>}
        </>
    );
};

export default InfinityScrollComponent;
