import fs from "fs";
import { s3 } from "../../..";
import { S3 } from "aws-sdk";

// ################## UPLOAD ######################

type TUploadimageAWSParams = {
  path: string;
  filename: string;
  mimetype: string;
};
export const uploadimageAWS = async ({
  path,
  filename,
  mimetype,
}: TUploadimageAWSParams) => {
  const params = {
    ACL: "public-read",
    Bucket: process.env.AWS_BUCKET_NAME ?? "",
    Body: fs.createReadStream(path),
    ContentType: mimetype,
    Key: `${process.env.AWS_GALLERY_FOLDER_NAME}/${filename}`,
  };
  return s3.upload(params).promise();
};

// ################## DELETE ######################

type TDeleteImageAWSAWSParams = {
  key: string;
};
export const deleteImageAWS = async ({ key }: TDeleteImageAWSAWSParams) => {
  console.log("key", key);
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME ?? "",
    Key: key,
  };
  return s3.deleteObject(params).promise();
};
