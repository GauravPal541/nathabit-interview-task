-- Blackshield V3 Request Response Logger 
-- Author: Vikas Sood <vikas@eno8.com>
-- 
--
--
json = require("json")

-- function to check if input is missing or empty
function isAuth(res)
    return res.status == 200
end

-- trigger authentication
local res = ngx.location.capture("/governance/auth")
-- ngx.log(ngx.CRIT, json.encode(res))
if res.status == 200 then
    ngx.exit(ngx.OK)
else
    -- local response = "{'status':" .. res.status .. ", 'message':" .. res.message .. "}"
    ngx.header.content_type = res.header["Content-Type"]
    ngx.status = res.status
    ngx.say(res.body)
    ngx.exit(res.status)
end