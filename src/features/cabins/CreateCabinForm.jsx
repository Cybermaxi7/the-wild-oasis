import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
    const { id: editId, ...editValues } = cabinToEdit;
    const isEditSession = Boolean(editId);

    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
 
    const { errors } = formState;

    const { createCabin, isCreating } = useCreateCabin();
    const { updateCabin, isUpdating } = useUpdateCabin();
    const isWorking = isCreating || isUpdating;
    function onSubmit(data) {
        const image =
            typeof data.image === "string" ? data.image : data.image[0];
        if (isEditSession)
            updateCabin(
                { newCabinData: { ...data, image }, id: editId },
                {
                    onSuccess: (data) => {
                        reset({});
                        console.log(data)
                    },
                }
            );
        else
            createCabin(
                { ...data, image: image },
                { onSuccess: () => reset() }
            );
        // console.log(data.image[0])
    }
    function onError(error) {
        console.error(error);
    }
    // const me = useMutation();
    // console.log(me.isIdle);
    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    disabled={isWorking}
                    type="text"
                    id="name"
                    {...register("name", {
                        required: "this field is required",
                    })}
                />
            </FormRow>
            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    disabled={isWorking}
                    type="number"
                    id="maxCapacity"
                    {...register("maxCapacity", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Minimum capacity is 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    disabled={isWorking}
                    type="number"
                    id="regularPrice"
                    {...register("regularPrice", {
                        required: "This field is required",
                    })}
                />
            </FormRow>
            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    disabled={isWorking}
                    type="number"
                    id="discount"
                    defaultValue={0}
                    {...register("discount", {
                        required: "This field is required",
                        validate: (value) =>
                            +value <= getValues().regularPrice ||
                            "Discount should be less than regular price",
                    })}
                />
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    disabled={isWorking}
                    type="number"
                    id="description"
                    defaultValue=""
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Cabin photo" error={errors?.image?.message}>
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: isEditSession
                            ? false
                            : "This field is required",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? "Edit cabin" : "Create new cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
