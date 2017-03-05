local component = require('component');
if not component.isAvailable("geolyzer") then
  error("Geolyzer not found");
end
local geolyzer = component.geolyzer;
local tcp = require('tcp');
local pos = require('trackPosition');

local M = {};

function M.weightedAverage(n1, w1, n2, w2)
  return (n1*w1 + n2*w2)/(w1 + w2);
end

function M.volume(x, z, y, w, d, h, times)
  -- default to 0 (which is true in lua)
  if times then
    times = times - 1;
  else
    times = 0;
  end

  local robotPos = pos.get();
  local result = {
    x = x + robotPos.x,
    y = y + robotPos.y,
    z = z + robotPos.z,
    w=w,
    d=d,
    data=geolyzer.scan(x, z, y, w, d, h)};

  local weight = 1;
  for i = 1, times do

    local newScan = geolyzer.scan(x, z, y, w, d, h);

    -- average all data points using weights
    for j = 1, result.data.n do
      result.data[j] = M.weightedAverage(result.data[j], weight, newScan[j], 1);
    end

    weight = weight + 1;

  end
  tcp.write({['map data']=result});
end

function M.plane(y, times)
  for x = -32, 32 do
    M.volume(x, -32, y, 1, 64, 1, times);
  end
  -- max shape volume is 64, but we can scan from -32 to 32, inclusive
  -- that's 65, so we have one row we miss in the previous loop to scan
  -- still missing one cube after this final row, but oh well
  M.volume(-32, 32, y, 64, 1, 1, times);
end

return M;
