import json

def lambda_handler(event, context):
    # Print the incoming event to the log
    print("Received event: " + json.dumps(event, indent=2))
    
    # Process the event
    # For example, if the Lambda function is supposed to add two numbers, you could expect
    # the event to contain a 'body' field with the numbers provided in JSON format.
    # {
    #     "body": "{\"number1\": 3, \"number2\": 5}"
    # }
    
    # Check if there is a 'body' key in the event and if not, return a 400 error
    if 'body' not in event:
        return {
            'statusCode': 400,
            'body': json.dumps('Invalid input')
        }
    
    # Assume we're receiving a JSON string in 'body', convert it to a dict
    body = json.loads(event['body'])
    
    # Extract the numbers from the body and calculate the sum
    # This is just an example; your actual processing logic will vary
    number1 = body.get('number1', 0)
    number2 = body.get('number2', 0)
    result = number1 + number2
    
    # Create a response
    response = {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': json.dumps({
            'result': result
        })
    }
    
    # Return the response
    return response
