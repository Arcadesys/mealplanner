const handleDelete = (id: string) => {
    fetch(`/Recipe/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Handle successful deletion, maybe update state or notify user
    })
    .catch(error => {
        console.error('There was a problem with the delete operation:', error);
    });
};

