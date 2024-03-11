-- 
-- Lua Intercept to authorize the API Call
--
-- Author: Vikas Sood <vikas@eno8.com>
-- 
--

-- function to check if input is missing or empty
function isAuth(res)
    return res.status == 200
end

-- trigger authentication
local res = ngx.location.capture("/authorize")
-- ngx.log(ngx.CRIT, json.encode(res))

if res.status == 200 then
    ngx.exit(ngx.OK)
elseif res.status == 204 then
    ngx.header["Access-Control-Allow-Methods"] = res.header["Access-Control-Allow-Methods"]
    ngx.header["Access-Control-Allow-Origin"] = res.header["Access-Control-Allow-Origin"]
    ngx.header["Access-Control-Allow-Headers"] = res.header["Access-Control-Allow-Headers"]
    ngx.header["Access-Control-Max-Age"] = res.header["Access-Control-Max-Age"]
    ngx.status = res.status
    ngx.exit(res.status)
else
    -- local response = "{'status':" .. res.status .. ", 'message':" .. res.message .. "}"
    ngx.header.content_type = res.header["Content-Type"]
    ngx.status = res.status
    ngx.say(res.body)
    ngx.exit(res.status)
end