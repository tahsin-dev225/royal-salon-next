import axios from "axios"

export const getServices = async () =>{
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/manage-service/api`)
        return res.data;
    } catch (error) {
        return []
    }
}