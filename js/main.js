function submit()
{
    setDisability(true);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://isapi.icu-tech.com/icutech-test.dll/soap/IICUTech', true);

    var sr =
        '<?xml version="1.0" encoding="utf-8"?>' +
        '<soapenv:Envelope ' + 
            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
            'xmlns:urn="urn:ICUTech.Intf-IICUTech" ' +
            'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
            'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"> ' +
            '<soapenv:Body>' +
               '<urn:Login soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">'+
                    '<UserName xsi:type="xsd:string">'+getUserName()+'</UserName>'+
                    '<Password xsi:type="xsd:string">'+getPassword()+'</Password>'+
                    '<IPs xsi:type="xsd:string">'+getIP()+'</IPs>'+
                '</urn:Login>'+
            '</soapenv:Body>' +
        '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                var x = xmlhttp.responseXML;
                var y = x.getElementsByTagName('NS1:LoginResponse');
                var z = JSON.parse(y[0].textContent);
                setAccess(z['ResultCode'] == undefined);
                setDisability(false);
            }
        }
    }
    xmlhttp.send(sr);
}

function setDisability(b)
{
    $('#userName')[0].disabled = b;
    $('#password')[0].disabled = b;
    $('#button')[0].disabled = b;
}

function setAccess(s)
{   
    var body = $('#myModalBody')[0];
    body.style = 'background-color: ' + (s ? 'green': 'red');
    body.textContent = (s ? 'Username: ' : 'Unauthorized: ') + getUserName();
    $('#myModal').modal('show');
}

function getUserName()
{
    return $('#userName')[0].value;
}

function getPassword()
{
    return $('#password')[0].value
}

function getIP()
{
    return '127.0.0.1';
}