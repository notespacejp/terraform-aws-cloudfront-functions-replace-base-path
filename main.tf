resource "aws_cloudfront_function" "this" {
    name = var.function_name
    runtime = var.runtime
    comment = var.comment
    publish = var.publish
    code = templatefile("${path.module}/dist/index.js", {

    })
}
