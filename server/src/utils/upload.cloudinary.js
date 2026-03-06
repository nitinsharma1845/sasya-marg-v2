import { v2 as cloudinary } from 'cloudinary'
import { config } from 'dotenv'
import fs from 'fs/promises'
import path from 'path'
import { ApiError } from './apiError.js'
config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


export const uploadToCloudinary = async (localFilePath) => {

    const absolutePath = path.resolve(localFilePath)

    try {

        const result = await cloudinary.uploader.upload(absolutePath, {
            resource_type: "image"
        })

        return {
            url: result.secure_url,
            publicId: result.public_id
        }

    } catch (error) {
        throw new ApiError(500, "Image upload failed")

    } finally {

        try {
            await fs.unlink(absolutePath)
        } catch { }

    }
}
export const deleteUploadedFile = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId, { resource_type: "image" })
        return true
    } catch (error) {
        console.log("Cloudinary deletion Error....", error)
        throw new ApiError(500, "Image destroy Failed")
    }

}