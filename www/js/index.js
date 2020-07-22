/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.querySelector("#spinner").hidden = true;
        document.querySelector('#act').addEventListener('click',()=>{
            this.loadMovements();
        });
       },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    loadMovements: function(){
        document.querySelector("#spinner").hidden = false;
        var funct = this.updateList;
        $.ajax({
            url : 'https://tp-arduino.herokuapp.com/movements',
            type : 'GET',
                 contentType: "application/json",
            success: function(response) {

            //entered in the success block means our service call is succeeded properly

                var resp = JSON.stringify(response); // we are accessing the text from the json object(response) and then converting it in to the string format
                console.log(resp); // print the response in console
                //alert(resp); // alert the response
                funct(response);

            },
            error: function(request, status, error) {
            alert("Error status " + status);
            alert("Error request status text: " + request.statusText);
            alert("Error request status: " + request.status);
            alert("Error request response text: " + request.responseText);
            alert("Error response header: " + request.getAllResponseHeaders());

                }
        });
    },
    formatDate: function(dateString){
        const options = {
            year: '2-digit', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            timeZone: 'Argentina/Buenos_Aires',
            timeZoneName: 'short'
          }
          const formatter = new Intl.DateTimeFormat('sv-SE', options);
          //const startingDate = new Date("2012/04/10 10:10:30 +0000")
          
          const dateInNewTimezone = formatter.format(dateString);
          return dateInNewTimezone; 
    },
    updateList: function(list){
        const options = {
            year: '2-digit', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            timeZone: 'America/Argentina/Buenos_Aires',
            timeZoneName: 'short'
          }
          const formatter = new Intl.DateTimeFormat('sv-SE', options);
          //const startingDate = new Date("2012/04/10 10:10:30 +0000")
          
        if(list.length == 0 ){
            document.querySelector("#Message").innerHTML = "Sin eventos registrados para actualizar.";
        }else{
            document.querySelector("#Message").innerHTML = "Actualizado";
            document.querySelector("#lista").innerHTML = "";
        }
        list.forEach(element => {
            var node = document.createElement("LI");                 // Create a <li> node
            var textnode = document.createTextNode("Sensor: "+ element.sensorId + ', horario registro: ' + formatter.format(Date.parse(element.fecha)));         // Create a text node
            node.appendChild(textnode);                              // Append the text to <li>
            document.querySelector("#lista").appendChild(node);     // Append <li> to <ul> with id="myList"    
        });
        document.querySelector("#spinner").hidden = true;
    }
};

app.initialize();