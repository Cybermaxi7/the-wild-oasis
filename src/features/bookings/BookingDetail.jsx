import styled from "styled-components";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag";
import BookingDataBox from "./BookingDataBox";

import {
    HiArrowDownOnSquare,
    HiArrowUpOnSquare,
    HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useMoveBack } from "../../hooks/useMoveBack";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import { useCheckout } from "../check-in-out/useCheckout";
import { useBooking } from "./useBooking";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { booking, isLoading } = useBooking();
    const { checkout, isCheckingOut } = useCheckout();
    const { isDeleting, deleteBooking } = useDeleteBooking();
    const { status, id: bookingId } = booking;
    const moveBack = useMoveBack();
    const navigate = useNavigate();

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    if (isLoading) return <Spinner />;
    if(!booking ) return <Empty resourceName="booking" />
    console.log(booking)
    return (
        <>
            <Modal>
                <Row type="horizontal">
                    <HeadingGroup>
                        <Heading as="h1">Booking #{bookingId}</Heading>
                        <Tag type={statusToTagName[status]}>
                            {status.replace("-", " ")}
                        </Tag>
                    </HeadingGroup>
                    <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
                </Row>

                <BookingDataBox booking={booking} />
                <ButtonGroup>
                    {status === "unconfirmed" && (
                        <Button
                            icon={<HiArrowDownOnSquare />}
                            onClick={() => navigate(`/checkin/${bookingId}`)}
                        >
                            Check in
                        </Button>
                    )}
                    {status === "checked-in" && (
                        <Button
                            icon={<HiArrowUpOnSquare />}
                            onClick={() => checkout(bookingId)}
                            disabled={isCheckingOut}
                        >
                            Check out
                        </Button>
                    )}

                    <Modal.Open opens="delete">
                        <Button variation="danger" icon={<HiTrash />}>Delete Booking</Button>
                    </Modal.Open>

                    <Modal.Window name="delete">
                        <ConfirmDelete
                            resourceName={`booking #${bookingId}`}
                            onConfirm={() => deleteBooking(bookingId, {
                                onSettled: () => navigate(-1)
                            })}
                            disabled={isDeleting}
                        />
                    </Modal.Window>
                    <Button variation="secondary" onClick={moveBack}>
                        Back
                    </Button>
                </ButtonGroup>
            </Modal>
        </>
    );
}

export default BookingDetail;
