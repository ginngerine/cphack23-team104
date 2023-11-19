import boto3
import sagemaker
from sagemaker.session import Session
#SageMaker ML Training
# Initialize the SageMaker session and the boto3 client
sagemaker_session = Session()
sagemaker_client = boto3.client('sagemaker')

# Specify your bucket and prefix here
bucket = 'your-s3-bucket-name'
prefix = 'sagemaker/your-prefix'

# Replace this with the ARN of your machine learning model
image_uri = 'your-model-image-uri'

# Define the S3 input types
s3_input_train = sagemaker.inputs.TrainingInput(s3_data='s3://{}/{}/train'.format(bucket, prefix), content_type='csv')
s3_input_validation = sagemaker.inputs.TrainingInput(s3_data='s3://{}/{}/validation'.format(bucket, prefix), content_type='csv')

# Specify an IAM role with SageMaker permissions
role = 'arn:aws:iam::your-account-number:role/your-sagemaker-role'

# Define the estimator with the algorithm container and configuration
estimator = sagemaker.estimator.Estimator(image_uri=image_uri,
                                          role=role,
                                          instance_count=1,
                                          instance_type='ml.m4.xlarge',
                                          output_path='s3://{}/{}/output'.format(bucket, prefix),
                                          sagemaker_session=sagemaker_session)

# Set hyperparameters (replace these with your model's hyperparameters)
estimator.set_hyperparameters(learning_rate=0.01,
                              epochs=20,
                              batch_size=128)

# Specify the input data configuration and execute the training job
estimator.fit({'train': s3_input_train, 'validation': s3_input_validation})
