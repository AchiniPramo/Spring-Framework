// Drag & Drop File Upload
    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("profile-pic");

    dropZone.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", function () {
    if (this.files.length > 0) {
    const file = this.files[0];
    if (file.type.startsWith("image/")) {
    const imgURL = URL.createObjectURL(file);
    dropZone.innerHTML = '<img src="${imgURL}" class="profile-preview"><p>Click to change image</p>';
}
}
});

    let isEditing = false;
    let currentEditId = null;
    let currentImageUrl = '';

    // Handle drag and drop
    const $dropZone = $('#dropZone');
    const $fileInput = $('#profile-pic');

    fetchCustomerData();

    $dropZone.on('dragover', function (e) {
    e.preventDefault();
    $(this).addClass('bg-light');
});

    $dropZone.on('dragleave', function () {
    $(this).removeClass('bg-light');
});

    $dropZone.on('drop', function (e) {
    e.preventDefault();
    $(this).removeClass('bg-light');
    const file = e.originalEvent.dataTransfer.files[0];
    handleFile(file);
});

    $dropZone.on('click', function () {
    $fileInput.click();
});

    $fileInput.on('change', function (e) {
    if (this.files.length > 0) {
    handleFile(this.files[0]);
}
});

    function handleFile(file) {
    if (file && file.type.startsWith('image/')) {
    currentImageUrl = URL.createObjectURL(file);
    $dropZone.html(
    `<img src="${currentImageUrl}" alt="Preview" style="max-height: 100px; max-width: 100%;">
                <p class="mb-0 mt-2">Click to change image</p>`
    );
}
}

    function fetchCustomerData() {
    $.ajax({
        url: "http://localhost:8080/10_Back_End_Web_exploded/api/V1/customer/getAll",
        success: function (response) {
            $("#customerTable").empty();
            for (const data of response) {
                $("#customerTable").append(
                    `<tr data-id="${data.id}">
                            ${createTableRow(data.id, data.name, data.address, data.age)}
                        </tr>`
                );
            }
        },
        error: function (error) {
            alert(error);
        }
    });
}

    $('#customerForm').on('submit', function (e) {
    e.preventDefault();
    saveCustomer();
});

    function saveCustomer() {
    const id = $('#id').val();
    const name = $('#name').val();
    const address = $('#address').val();
    const age = $('#age').val();

    if (!id || !name) {
    alert('ID and Name are required!');
    return;
}

    if (isEditing) {
    updateExistingCustomer(id, name, address, age);
} else {
    addNewCustomer(id, name, address, age);
}

    clearForm();
}

    function addNewCustomer(id, name, address, age) {
    $.ajax({
        url: "http://localhost:8080/10_Back_End_Web_exploded/api/V1/customer/save",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(
            {
                id: id,
                name: name,
                address: address,
                age: age
            }),
        success: function (response) {
            fetchCustomerData()
            clearForm();
            alert("Customer Saved!");
        },
        error: function (error) {
            alert(error);
        }
    });
}

    function updateExistingCustomer(id, name, address, age) {
    $.ajax({
        url: "http://localhost:8080/10_Back_End_Web_exploded/api/V1/customer/update",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(
            {
                id: id,
                name: name,
                address: address,
                age: age
            }),
        success: function (response) {
            fetchCustomerData()
            clearForm();
            alert("Customer Updated!");

            isEditing = false;
            currentEditId = null;
            $('#saveBtn').html('<i class="bi bi-save"></i> Save Customer');
        },
        error: function (error) {
            alert(error);
        }
    });
}

    function createTableRow(id, name, address, age) {
    return `
            <td><img src="${currentImageUrl || 'https://via.placeholder.com/40'}" class="profile-preview"></td>
            <td>${id}</td>
            <td>${name}</td>
            <td>${age}</td>
            <td>${address}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="editCustomer(this)">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="removeCustomer(this)">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
}

    window.editCustomer = function (button) {
    const $row = $(button).closest('tr');
    const $cells = $row.find('td');

    $('#id').val($cells.eq(1).text());
    $('#name').val($cells.eq(2).text());
    $('#age').val($cells.eq(3).text());
    $('#address').val($cells.eq(4).text());

    currentImageUrl = $cells.eq(0).find('img').attr('src');
    $dropZone.html(
    `<img src="${currentImageUrl}" alt="Preview" style="max-height: 100px; max-width: 100%;">
            <p class="mb-0 mt-2">Click to change image</p>`
    );

    isEditing = true;
    currentEditId = $cells.eq(1).text();
    $('#saveBtn').html('<i class="bi bi-check-circle"></i> Update Customer');
    $('#id').prop('disabled', true);
};

    window.removeCustomer = function (button) {
    const $row = $(button).closest('tr');
    const $cells = $row.find('td');

    let id = $cells.eq(1).text();

    if (confirm('Are you sure you want to delete this customer?')) {
    $.ajax({
    url: "http://localhost:8080/10_Back_End_Web_exploded/api/ui/customer/delete/" + id,
    method: "DELETE",
    success: function (response) {
    fetchCustomerData();
    alert("Customer Deleted!");
},
    error: function (error) {
    console.log(error)
}
})
}
};

    function clearForm() {
    $('#customerForm')[0].reset();
    $('#id').prop('disabled', false);
    isEditing = false;
    currentEditId = null;
    currentImageUrl = '';
    $dropZone.html(
    `<i class="bi bi-cloud-upload fs-3"></i>
            <p class="mb-0">Drop your image here or click to browse</p>`
    );
    $('#saveBtn').html('<i class="bi bi-save"></i> Save Customer');
}