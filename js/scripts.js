let notes = { data: [] };

let updateList = function() {
    console.log('[Application] start watch');

    Array.observe(notes.data, function(changes) {
        let index = null;
        let value = '';
        let status = null;

        if (changes[0].type === 'splice') {
            index = changes[0].index;
            value = changes[0].object[index];
            status = (changes[0].addedCount > 0) ? 'created' : 'removed';
        }

        if (changes[0].type === 'update') {
            index = changes[0].name;
            value = changes[0].object[index];
            status = 'updated';
        }

        if (!value && status === 'created' && status === 'update') {
            return;
        }

        let notesTag = document.getElementById('notes');

        if (status === 'update') {
            console.log('implementar');
        }

        if (status === 'removed') {
            let listOfNotes = document.querySelectorAll('#notes li');
            notesTag.removeChild(listOfNotes[index]);
        }

        if (status === 'created') {
            let newLi = document.createElement('li');
            newLi.innerHTML = value;
            notesTag.appendChild(newLi);
        }
        console.log(status);
    });
}

let createNote = function() {
    let input = document.querySelector('#form-add-note input[type="text"]');
    let value = input.value;

    notes.data.push(value);

    input.value = '';
}

updateList();

document.addEventListener('DOMContentLoaded', function(event) {
    let listOfNotes = document.getElementById('notes');
    let listHtml = '';

    for (let i = 0; i < notes.data.length; i++) {
        listHtml += '<li>' + notes.data[i] + '</li>';
    }

    listOfNotes.innerHTML = listHtml

    let formAddNotes = document.getElementById('form-add-note');
    formAddNotes.addEventListener('submit', function(e) {
        e.preventDefault();
        createNote();
    });
});

document.addEventListener('click', function(e) {
    let notesTag = document.getElementById('notes');

    if (e.target.parentElement === notesTag) {
        if (confirm('remover esta nota?')) {
            let listOfNotes = document.querySelectorAll('#notes li');
            listOfNotes.forEach(function(item, index) {
                if (e.target === item) {
                    notes.data.splice(index, 1);
                }
            });
        }
    }
});