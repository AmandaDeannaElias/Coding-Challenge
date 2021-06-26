var xhttp1 = new XMLHttpRequest();
xhttp1.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        // perform when document is ready
        xhttp1.responseText;
        console.log(xhttp1.responseText);
        var result = JSON.parse(xhttp1.responseText);

        //turn object into an array
        var resultArray = Object.values(result);
        console.log(resultArray);
        var i;

        //loop for each item in array
        for (i = 0; i < resultArray.length; i++) {

            //the number 1 is to show a team member is featured(as displayed in the array) so if the member has "employeeisfeatured: 1", display the crown
            function featuredMember(featured) {
                if (featured == 1) {
                    return "&#128081;";
                } else {
                    return "";
                }
            }
            
            //grab my id's, the employee pictures from the endpoint, and the data from the array
            var memberContainer = document.getElementById('member_box');
            var memberPic = "http://sandbox.bittsdevelopment.com/code1/employeepics/" + resultArray[i].employeeid + ".jpg";
            var firstName = resultArray[i].employeefname;
            var lastName = resultArray[i].employeelname;
            var bio = resultArray[i].employeebio;

            //style and add classes in the for loop to be able to dynamically display content from the api
            memberContainer.innerHTML +=
                '<div class="loopcontainer">' +
                '<div class="featuredIcon">' +
                featuredMember(resultArray[i].employeeisfeatured) +
                '</div>' +
                '<div class="employeePic">' +
                '<img src="' + memberPic + '" alt="profile picture for employee" height=300 />' +
                '</div>' +
                '<h1 id="employeeName">' + firstName + ' ' + lastName + '</h1>' +
                '<h3 id="employeeBio">' + bio + '</h3>' +
                // use map to 
                resultArray[i].roles.map(function (employeeRole) {
                    return '<div class="role">' +
                        //the color for Trilby's role of Communications is making the white font fade into the background
                        '<p style= "background-color:' + employeeRole.rolecolor + '">' + employeeRole.rolename + '</p>'
                }).join("  ") +
                '</div></div>';
        }
    }
};

xhttp1.open("GET", "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php", true);
xhttp1.send();


