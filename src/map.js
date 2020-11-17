
      // 設定圖資來源
      var osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      var osm = new L.TileLayer(osmUrl, { minZoom: 6, maxZoom: 16 });
      
      
      var emptyGeojson = {
        "type": "FeatureCollection",
        "features": []
      };
      document.getElementById("code").value= JSON.stringify(emptyGeojson);
      var geoJSONLayer = L.geoJSON(JSON.parse(document.getElementById("code").value));
      var tableLayer = L.geoJSON(emptyGeojson);

      var baseMaps = {
        "osm": osm
      };
    
      var overlayMaps = {
        "geojson圖層": geoJSONLayer,
        "測試圖層": tableLayer
      };

      // 建立 Leaflet 地圖
      var mymap = L.map("mapid");
      mymap.addLayer(osm);
      mymap.addLayer(geoJSONLayer);
      mymap.addLayer(tableLayer);

      // 設定經緯度座標
      mymap.setView(new L.LatLng(23.4, 121.1333), 8);
      lcontrol = L.control.layers(baseMaps,overlayMaps).addTo(mymap);

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
                      "type": "Polygon",
                      "coordinates": [
                        JSON.parse('['+document.getElementById("coordLst").value+']')    
                      ]
                    },
                    "properties": {
                      "名稱": (document.getElementById("title").value),
                      "單位": (document.getElementById("issuer").value),
                      "礙航原因、目的": (document.getElementById("reason").value),
                      "礙航類別": (document.getElementById("classification").value),
                      "開始時間": (document.getElementById("startTime").value),
                      "結束時間": (document.getElementById("endTime").value),
                      "坐標系統": (document.getElementById("coordSys").value),
                      "限制中心": (document.getElementById("coord").value),
                      "限制高度": (document.getElementById("heightLimit").value),
                      "原發布公告網址": (document.getElementById("link").value)
                    }
                  }
                ]
              };
        return geojsonFeature     
      };

    function processData() {
            var itext = document.getElementById("coord").value;
            var coordinate = JSON.parse(itext);
            console.log(coordinate);
            //polygon.addTo(mymap);
            //mymap.fitBounds(polygon.getBounds());
            //L.geoJSON(getLatestGeojson()).addTo(mymap);
            tableLayer.clearLayers();
            tableLayer.addData(getLatestGeojson());
            lcontrol.remove(mymap);
            lcontrol = L.control.layers(baseMaps,overlayMaps).addTo(mymap);
            //mymap.fitBounds(tableLayer.getBounds());
            document.getElementById("updateAlert").innerHTML= "限制區域繪製於左方地圖!";
            };

            //更新geojson 按鈕
        function updateGeojson(){
                var newjsonitem = getLatestGeojson();
                var jsonfile;
                if (document.getElementById("code").value==""){
                    jsonfile = emptyGeojson;
                }
                else{
                jsonfile = JSON.parse(document.getElementById("code").value);
                };
                for (i=0; i< newjsonitem.features.length;i++){
                jsonfile.features.push(newjsonitem.features[i]);
                };
                document.getElementById("code").value= JSON.stringify(jsonfile);
                document.getElementById("updateAlert").innerHTML= "已更新至Geojson分頁!";
        };

        function drawGeojson(){
            geoJSONLayer.clearLayers();
            geoJSONLayer.addData(JSON.parse(document.getElementById("code").value));
                //geoJSONLayer.addTo(mymap);
            lcontrol.remove(mymap);
            lcontrol = L.control.layers(baseMaps,overlayMaps).addTo(mymap);
        }
        //解析geojson 按鈕 -> 更改為editGeojson();
        function parseGeojson(){
                var jsontxt = JSON.parse(document.getElementById("code").value);
                //var featureTitleLst = [];
                var newdiv = document.createElement("div");
                for (i = 0; i < jsontxt.features.length; i++) {
                        //featureTitleLst.push(jsontxt.feature[i].properties.title);
                        newdiv.appendChild(document.createTextNode(String(i+1)+'. '+JSON.stringify(jsontxt.features[i].properties.名稱)));
                        newdiv.appendChild(document.createElement("br"));
                };
                //list titles
                //newdiv.appendChild(document.createTextNode(JSON.stringify(featureTitleLst[i])))
                document.getElementById('titleList').innerHTML=newdiv.innerHTML;
                document.getElementById('titleNumbers').innerHTML="本文檔共有"+String(jsontxt.features.length)+"個物件：";
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

 /*
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
}*/

function clearAllEntry(){
    console.log("clearing")
    var list = document.getElementById("coordCell");
    const len = list.childNodes.length; 
    coordLst=[];
    console.log(coordLst);
    document.getElementById("coordLst").innerHTML=''
}


document.getElementById('tabTable').style.display = "block";


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

  function saveTextAsFile()
  {
      var textToWrite = document.getElementById('code').value;
      var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
      var fileNameToSaveAs = "alerts.geojson";
  
      var downloadLink = document.createElement("a");
      downloadLink.download = fileNameToSaveAs;
      downloadLink.innerHTML = "Download File";
      if (window.webkitURL != null)
      {
          // Chrome allows the link to be clicked
          // without actually adding it to the DOM.
          downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
      }
      else
      {
          // Firefox requires the link to be added to the DOM
          // before it can be clicked.
          downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
          downloadLink.onclick = destroyClickedElement;
          downloadLink.style.display = "none";
          document.body.appendChild(downloadLink);
      }
  
      downloadLink.click();
  }
  var button = document.getElementById('save');
        button.addEventListener('click', saveTextAsFile);