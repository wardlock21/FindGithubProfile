$(document).ready(function () {
    $('#searchUser').on('keyup', function (e) {
        let username = e.target.value
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                client_id: '8809ad9f02da0229d3c4',
                client_secret: 'c33f94b51934bdf7c3f7f77d81d73c5514ea7358'
            }
        }).done(function (user) {
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: '8809ad9f02da0229d3c4',
                    client_secret: 'c33f94b51934bdf7c3f7f77d81d73c5514ea7358',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function (repos) {
                $.each(repos, function (index, repo) {
                    $('#repos').append(`
                    <div class="well">
                        <div class="row">
                            <div class="col-md-7">
                                <strong>${repo.name}</strong>: ${repo.description}
                            </div>
                            <div class="col-md-3">
                                <span class="label bg-success">Forks: ${repo.forks_count}</span>
                                <span class="label bg-info">Watchers: ${repo.watchers_count}</span>
                                <span class="label bg-warning">Stars: ${repo.stargazers_count}</span>
                            </div>
                            <div class="col-md-2">
                                 <a  target="_blank" href="${repo.html_url}" class="btn btn-primary">Repositary Page</a>
                            </div>
                        </div>
                        <br>
                    </div>
                    `);
                });
            });
            $('#profile').html(`
                <div class="card">
                    <div class="card-header">
                        Github Profile
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${user.name}</h5>
                        <div class="row">
                            <div class="col-md-3">
                                <img class="thumbnail avatar" src= ${user.avatar_url}><br><br>
                                <a  target="_blank" href="${user.html_url}" class="btn btn-primary btn-block">Go to profile</a>
                            </div>
                            <div class="col-md-9">
                                <span class="label bg-success">Public Repositary: ${user.public_repos}</span>
                                <span class="label bg-info">Public Gists: ${user.public_gists}</span>
                                <span class="label bg-warning">Followers: ${user.followers}</span>
                                <span class="label bg-danger">Following: ${user.following}</span>
                                <br><br>
                                <ul class="list-group">
                                    <li class="list-group-item">Company: ${user.company}</li>
                                    <li class="list-group-item">Location: ${user.location}</li>
                                    <li class="list-group-item">Email: ${user.email}</li>
                                    <li class="list-group-item">Member Since: ${user.created_at}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> 
                <h3 class="page-header">Latest Repositary</h3><br>
                <div id="repos"></div>
            `);
        });
    });
});
