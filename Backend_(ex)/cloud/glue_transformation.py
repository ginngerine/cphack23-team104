import sys
from awsglue.context import GlueContext
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.job import Job
from awsglue.dynamicframe import DynamicFrame
#(AWS Glue Data Transformation)
# Define your input parameters
args = getResolvedOptions(sys.argv, ['JOB_NAME', 'INPUT_TABLE', 'OUTPUT_BUCKET', 'DATABASE_NAME'])

# Initialize a Glue context
sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)

# Start job
job.init(args['JOB_NAME'], args)

# Catalog: fetches your table data
datasource = glueContext.create_dynamic_frame.from_catalog(database=args['DATABASE_NAME'], table_name=args['INPUT_TABLE'])

# Apply some transformations to the data
# In this example, we are simply converting it to a DataFrame and back to a DynamicFrame.
# Replace this with your own transformation logic.
df = datasource.toDF()
transformed_df = df.dropDuplicates()  # Example transformation: remove duplicates
transformed_dyf = DynamicFrame.fromDF(transformed_df, glueContext, "transformed_dyf")

# Write it out in Parquet format to the specified S3 bucket
sink = glueContext.write_dynamic_frame.from_options(
    frame=transformed_dyf,
    connection_type="s3",
    connection_options={"path": args['OUTPUT_BUCKET']},
    format="parquet"
)

# Finish up the job
job.commit()
