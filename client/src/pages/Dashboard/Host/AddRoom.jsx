import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utilits";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from 'react-query';


const AddRoom = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [imagepreview, setImagePreview] = useState();
    const [imageText, imageSetText] = useState('upload image');
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: null,
        key: 'selection'
    });
    //    date range handaler 
    const handleDates = item => {
        console.log(item);
        setDates(item.selection)
    }


    // data send in database 
    const { mutateAsync } = useMutation({
        mutationFn: async (roomData) => {
            const { data } = await axiosSecure.post('/room', roomData)
            return data
        }
    })


    //   form submited
    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target
        const location = form.location.value
        const category = form.category.value
        const title = form.title.value
        const to = dates.endDate
        const from = dates.startDate
        const price = form.price.value
        const guest = form.total_guest.value
        const bathrooms = form.bathrooms.value
        const description = form.description.value
        const bedrooms = form.bedrooms.value;
        const image = form.image.files[0]
        const host = {

            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email
        }

        try {
            const image_url = await imageUpload(image);
            const roomData = {
                location,
                category,
                title,
                to,
                from,
                price,
                guest,
                bathrooms,
                bedrooms,
                host,
                description,
                image: image_url
            }

            await mutateAsync(roomData);
            console.log('Room added successfully');


        } catch (err) {
            console.log(err);
        }

    }

    // handle image change 
    const handleImage = image => {
        setImagePreview(URL.createObjectURL(image))
        imageSetText(image.name)
    }

    return (
        <div>

            <AddRoomForm
                dates={dates}
                handleDates={handleDates}
                handleSubmit={handleSubmit}
                setImagePreview={setImagePreview}
                imagepreview={imagepreview}
                handleImage={handleImage}
                imageText={imageText}
            />
        </div>
    );
};

export default AddRoom;