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
    Key: `${process.env.AWS_BUCKET_NAME}/${filename}`,
  };
  return s3.upload(params).promise();
};
