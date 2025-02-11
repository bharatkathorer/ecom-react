import {useNavigate, useParams} from "react-router-dom";
import AuthLayout from "../../../layouts/backend/AuthLayout.tsx";
import {useEffect, useState} from "react";
import orderApi from "../../../api/backend/orderApi.ts";
import TimeLineComponent from "../../../components/formLayout/timeline/TimeLineComponent.tsx";
import TimeLineItem from "../../../components/formLayout/timeline/TimeLineItem.tsx";
import {formatDate, orderStatus} from "../../../utils/const.tsx";
import {XMarkIcon} from "@heroicons/react/20/solid";

const ViewOrderPage = () => {
    const {orderId} = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<any>({})
    useEffect(() => {
        findOrder();
    }, []);
    const findOrder = async () => {
        const response: any = await orderApi.find(orderId);
        if (response.data.success) {
            response.data.order_transactions = await JSON.parse(response.data.order_transactions)
            setOrder(response.data);
        } else {
            // navigate(-1);
        }
    }

    return <AuthLayout>
        <div className="">
            <TimeLineComponent>
                <>
                    <TimeLineItem
                        title={orderStatus(0)}
                        subTitle={formatDate(order.order_created_at)}
                        description={'Order Created'}
                    />
                    {
                        order?.order_transactions?.filter((i:any) => i.id).map((history: any) => (
                            <TimeLineItem
                                key={history.id}
                                title={orderStatus(history.status)}
                                subTitle={formatDate(history.created_at)}
                                description={history.note}
                            />
                        ))
                    }
                </>
            </TimeLineComponent>




        </div>
    </AuthLayout>
}

export default ViewOrderPage;
