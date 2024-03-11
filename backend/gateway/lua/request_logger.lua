-- Blackshield V3 Request Response Logger 
-- Author: Vikas Sood <vikas@eno8.com>
-- 
--
--
json = require("json")

-- create local buffer
local data = {request={}, response={}}
local req = data["request"]
local resp = data["response"]


-- Request 
req["method"] = ngx.req.get_method()
req["uri"] = ngx.var.uri
req["headers"] = ngx.req.get_headers()
if string.match(req["method"], "GET") then 
    req["get_args"] = ngx.req.get_uri_args()
else 
    req["post_args"] = ngx.req.get_post_args()
end 

-- Response


-- Push the log 
ngx.log(ngx.CRIT, json.encode(data));
