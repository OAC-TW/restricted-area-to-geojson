function toggleInputCells(button) {
    var cells = document.getElementsByClassName('input');
    
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      var input = cell.getElementsByTagName('input')[0];
  
      if (input != null) {
        var text = input.value;
        cell.innerHTML = text;
      } else {
        var text = cell.innerHTML;
        cell.innerHTML = '';
        var input = document.createElement('input');
        input.type = "text";
        input.value = text;
        cell.appendChild(input);
      }
    }
  }
  
  function deleteRow(index){
    console.log(index);
    var jsontxt = JSON.parse(document.getElementById("code").value);
    jsontxt.features.splice(index,1);
    console.log(jsontxt.features);
    document.getElementById("code").value = JSON.stringify(jsontxt);
    // event.target will be the input element.
    //var td = event.target.parentNode; 
    //var tr = td.parentNode; // the row to be removed
    //tr.parentNode.removeChild(tr);
    editGeoJSON();
  };

  function deleteRowFunction() {
    // event.target will be the input element.
    var td = event.target.parentNode; 
    var tr = td.parentNode; // the row to be removed
    tr.parentNode.removeChild(tr);
    console.log(event.target)
}
  
  //var rows = 10;
  var cols = 3;//欄位數目
  
  function editGeoJSON(){
    var jsontxt = JSON.parse(document.getElementById("code").value);
    var rows = jsontxt.features.length;
    var table = document.createElement('table');
    table.classList.add('table');
  
    var thead = document.createElement('thead');
    var headRow = document.createElement('tr');
    var columnNames = ["項次", "名稱","礙航類別"];
  
    for (var i = 0; i < cols; i++) {
      var th = document.createElement('th');
      th.appendChild(document.createTextNode(columnNames[i]));
      headRow.appendChild(th);
    };
  
    thead.appendChild(headRow);
  
    var tbody = document.createElement('tbody');
  
    for (var i = 0; i < rows; i++) {
      var tr = document.createElement('tr');
  
      for (var j = 0; j < cols; j++) {
        var td = document.createElement('td');
  
        if (j == 1) {
          //td.classList.add("input");
          var dbutton = document.createElement('button');
          dbutton.innerHTML = "刪除"; 
          dbutton.id="dbutton";
          var index = i-1;
          dbutton.addEventListener("click",function(){return deleteRow(index)});
          //dbutton.onclick=addEventListener("click",deleteRow(i));
          td.appendChild(dbutton);
          td.appendChild(document.createTextNode(jsontxt.features[i].properties.名稱))
          tr.appendChild(td);
          continue;
        };
        if (j == 2) {
          td.appendChild(document.createTextNode(jsontxt.features[i].properties.礙航類別))
          tr.appendChild(td);
          continue;
        };
        td.appendChild(document.createTextNode(String(i+1)));
        tr.appendChild(td);
      };
  
      tbody.appendChild(tr);
    }
  
    table.appendChild(thead);
    table.appendChild(tbody);
    document.getElementById("eTableRegion").innerHTML='';
    document.getElementById("eTableRegion").appendChild(table);
  }