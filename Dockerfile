FROM public.ecr.aws/lambda/nodejs:18

# disables xray when running locally
ENV AWS_XRAY_SDK_DISABLED=TRUE

# run main
CMD [ "main.handler" ]