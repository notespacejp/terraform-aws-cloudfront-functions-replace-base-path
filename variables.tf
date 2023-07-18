variable "function_name" {
    type = string
    description = "function name"
}

variable "runtime" {
    type = string
    default = "cloudfront-js-1.0"
    description = "function runtime name"
}

variable "comment" {
    type = string
    default = "managed by Terraform"
    description = "function comment"
}

variable "publish" {
    type = bool
    default = true
    description = "is published function"
}

variable "pathTable" {
    type = list(string)
    default = []
    description = "ignore url path list"
}
