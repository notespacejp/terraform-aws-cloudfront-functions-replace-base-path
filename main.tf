resource "aws_cloudfront_function" "basic_auth" {
    name = var.function_name
    runtime = var.runtime
    comment = var.comment
    publish = var.publish
    code = templatefile("${path.module}/functions/dist/index.js", {
        authString = base64encode("${var.user}:${var.password}")
    })
}
