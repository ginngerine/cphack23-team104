import boto3
#(DMS Configuration)

# Configuration for AWS DMS
dms_client = boto3.client('dms', region_name='us-west-2')  # Specify the correct region

# Configuration parameters - replace with your actual details
rep_instance_id = 'my-replication-instance'
rep_instance_class = 'dms.t2.micro'
source_endpoint_arn = 'source-endpoint-arn'
target_endpoint_arn = 'target-endpoint-arn'
rep_instance_arn = 'replication-instance-arn'
table_mappings = 'table-mappings-json'
task_id = 'my-dms-task'
source_engine_name = 'source-db-engine-name'  # e.g., 'mysql'
target_engine_name = 'target-db-engine-name'  # e.g., 'aurora-mysql'

# Create a replication instance
def create_replication_instance():
    try:
        dms_client.create_replication_instance(
            ReplicationInstanceIdentifier=rep_instance_id,
            ReplicationInstanceClass=rep_instance_class,
            AllocatedStorage=50  # The amount of storage (in gigabytes) to be initially allocated for the replication instance.
        )
        print(f'Replication instance {rep_instance_id} is being created.')
    except Exception as e:
        print(f'Error creating replication instance: {str(e)}')

# Create source and target endpoints
def create_endpoints(source_db_details, target_db_details):
    try:
        # Create source endpoint
        dms_client.create_endpoint(
            EndpointIdentifier='source-endpoint',
            EndpointType='source',
            EngineName=source_engine_name,
            Username=source_db_details['username'],
            Password=source_db_details['password'],
            ServerName=source_db_details['server'],
            Port=source_db_details['port'],
            DatabaseName=source_db_details['database']
        )
        
        # Create target endpoint
        dms_client.create_endpoint(
            EndpointIdentifier='target-endpoint',
            EndpointType='target',
            EngineName=target_engine_name,
            Username=target_db_details['username'],
            Password=target_db_details['password'],
            ServerName=target_db_details['server'],
            Port=target_db_details['port'],
            DatabaseName=target_db_details['database']
        )
        print('Source and target endpoints are being created.')
    except Exception as e:
        print(f'Error creating endpoints: {str(e)}')

# Create a replication task
def create_replication_task():
    try:
        dms_client.create_replication_task(
            ReplicationTaskIdentifier=task_id,
            SourceEndpointArn=source_endpoint_arn,
            TargetEndpointArn=target_endpoint_arn,
            ReplicationInstanceArn=rep_instance_arn,
            MigrationType='full-load-and-cdc',  # Can also be 'full-load' or 'cdc'
            TableMappings=table_mappings
        )
        print(f'Replication task {task_id} is being created.')
    except Exception as e:
        print(f'Error creating replication task: {str(e)}')

# Main function to orchestrate the DMS setup
def main():
    # Define source and target database details
    source_db = {
        'username': 'source-username',
        'password': 'source-password',
        'server': 'source-server-address',
        'port': 3306,
        'database': 'source-database-name'
    }
    
    target_db = {
        'username': 'target-username',
        'password': 'target-password',
        'server': 'target-server-address',
        'port': 3306,
        'database': 'target-database-name'
    }

    # Create the replication instance
    create_replication_instance()
    
    # Create the source and target endpoints
    create_endpoints(source_db, target_db)
    
    # Create the replication task
    create_replication_task()

if __name__ == '__main__':
    main()
