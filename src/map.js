
      // 建立 Leaflet 地圖
      var mymap = L.map("mapid");

      // 設定經緯度座標
      mymap.setView(new L.LatLng(22.2, 121.1333), 8);

      // 設定圖資來源
      var osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      var osm = new L.TileLayer(osmUrl, { minZoom: 6, maxZoom: 16 });
      mymap.addLayer(osm);
      
      //default coordinates
      var coordPolyText ="[ 121, 22.5333 ],\n[ 121.25, 22.5333 ],\n[ 121.30, 22.5 ],\n[ 121.35, 21.833333 ],\n[ 121.0, 21.8333 ],\n[ 120.8667, 22 ],\n[ 120.916667, 22.416667 ],\n[ 121, 22.5333 ]"
      document.getElementById("coordLst").appendChild(document.createTextNode(coordPolyText));

      //禁止區域
      //var polygon = L.polygon([[22.5333, 121.0 ],[22.5333, 121.25 ],[22.5, 121.30 ],[22.416667,120.91667 ],[22.5333, 121.0 ]]);
      //polygon.addTo(mymap);
      //polygon.bindPopup("限制區域");
      
      //console.log(document.getElementById("coord").value);
      //console.log(typeof(document.getElementById("coord").value));
      //var marker = L.marker(JSON.parse(document.getElementById("coord").value)).addTo(mymap);
      //var marker = L.marker([22.2, 121.1333]).addTo(mymap);
      //marker.bindPopup("區域中心: "+(document.getElementById("coord").value));



      function getLatestGeojson(){
        var geojsonFeature = {
                "type": "FeatureCollection",
                "features": [
                  {
                    "type": "Feature",
                    "geometry": {
                      "type": "Point",
                      "coordinates": JSON.parse(document.getElementById("coord").value)
                    },
                    "properties": { "名稱": (document.getElementById("title").value)+"(中心點)","description":"危險區域中心點" }
                  },
                  {
                    "type": "Feature",
                    "geometry": {
                      "type": "Polygon",
                      "coordinates": [
                        JSON.parse('['+document.getElementById("coordLst").value+']')    
                      ]
                    },
                    "properties": {
                      "名稱": (document.getElementById("title").value),
                      "單位": (document.getElementById("issuer").value),
                      "礙航原因、目的": (document.getElementById("reason").value),
                      "礙航類別": "射擊公告",
                      "開始時間": (document.getElementById("startTime").value),
                      "結束時間": (document.getElementById("endTime").value),
                      "坐標系統": "WGS84",
                      "限制區域": "",
                      "限制高度": "",
                      "原發布公告網址": "https://www.motcmpb.gov.tw/Information/Detail/8304e08e-e252-4e16-92e7-985bca08a234?SiteId=1&NodeId=113"
                    }
                  }
                ]
              };
        return geojsonFeature     
      }



    function processData() {
            var itext = document.getElementById("coord").value;
            var coordinate = JSON.parse(itext);
            console.log(coordinate);
            //var upolygon = JSON.parse(document.getElementById("polygon").value);
            //var upolygon = JSON.parse(document.getElementById("coordLst").value);
            //console.log(coordLst[0]);
            //var upolygon = JSON.parse(coordLst.push(coordLst[0]));
            //console.log(upolygon);
            //marker.setLatLng(coordinate);
            //polygon.setLatLngs(upolygon);
            //polygon.setLatLngs([[22.5333, 121.0 ],[22.5333, 121.25 ],[22.5, 121.30 ],[21.8333,121.35],[22.0, 120.8667 ],[22.416667,120.91667 ],[22.5333, 121.0 ]]);
            //mymap.setView(coordinate, 10);
            //polygon.addTo(mymap);
            //mymap.fitBounds(polygon.getBounds());
            L.geoJSON(getLatestGeojson()).addTo(mymap);
            //document.getElementById("code").appendChild(document.createTextNode(JSON.stringify(geojsonFeature)));
            };

        function updateGeojson(){
                var newjsonitem = getLatestGeojson();
                var jsonfile = JSON.parse(document.getElementById("code").value);
                for (i=0; i< newjsonitem.features.length;i++){
                jsonfile.features.push(newjsonitem.features[i]);
                };
                document.getElementById("code").value= JSON.stringify(jsonfile);
        }

        function checkGeojson(){
                L.geoJSON(JSON.parse(document.getElementById("code").value)).addTo(mymap);
        }

        function parseGeojson(){
                var jsontxt = JSON.parse(document.getElementById("code").value);
                //var featureTitleLst = [];
                var newdiv = document.createElement("div");
                for (i = 0; i < jsontxt.features.length; i++) {
                        //featureTitleLst.push(jsontxt.feature[i].properties.title);
                        newdiv.appendChild(document.createTextNode(JSON.stringify(jsontxt.features[i].properties.名稱)));
                        newdiv.appendChild(document.createElement("br"));
                };
                //list titles
                //newdiv.appendChild(document.createTextNode(JSON.stringify(featureTitleLst[i])))
                document.getElementById('titleList').innerHTML=newdiv.innerHTML;
        }
          

        var popup = L.popup();

        function onMapClick(e) {
                      popup
                          .setLatLng(e.latlng)
                          .setContent("You clicked the map at " + e.latlng.toString())
                          .openOn(mymap);
        }
    mymap.on('click', onMapClick);

    var coordLst = [];
 var text = ''; 

function addEntry(){
    var vertex = document.getElementById("polygon").value;
    coordLst.push(JSON.parse(vertex));
    console.log(coordLst);
    var i=0;
    text=text+vertex+',\n'
    //var pointEntry = document.createElement('p');
    //pointEntry.appendChild(document.createTextNode(vertex));
    //pointEntry.appendChild(document.createElement('br'));
    //document.getElementById("coordCell").appendChild(document.createTextNode(vertex));
    //document.getElementById("coordCell").appendChild(document.createElement('br'));
    document.getElementById("coordLst").innerHTML=text
}

function clearAllEntry(){
    console.log("clearing")
    var list = document.getElementById("coordCell");
    const len = list.childNodes.length; 
    coordLst=[];
    console.log(coordLst);
    document.getElementById("coordLst").innerHTML=''
}



  function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }
