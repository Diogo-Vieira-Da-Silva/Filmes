curl --request POST
--url https://api.themoviedb.org/3/account/22812937/favorite
--header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721'
--header 'accept: application/json'
--header 'content-type: application/json'

 curl --request GET \
 --url 'https://api.themoviedb.org/3/account/22812937/favorite/movies?language=en-US&page=1&sort_by=created_at.asc' \
 --header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721' \
 --header 'accept: application/json'

 curl --request GET \
 --url 'https://api.themoviedb.org/3/account/22812937/rated/movies?language=en-US&page=1&sort_by=created_at.asc' \
 --header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721' \
 --header 'accept: application/json'

 curl --request GET \
 --url 'https://api.themoviedb.org/3/movie/changes?page=1' \
 --header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721' \
 --header 'accept: application/json'

 curl --request GET \
 --url https://api.themoviedb.org/3/collection/collection_id/images \
 --header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721' \
 --header 'accept: application/json'

 curl --request GET \
 --url 'https://api.themoviedb.org/3/genre/movie/list?language=en' \
 --header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721' \
 --header 'accept: application/json'

 curl --request GET \
 --url 'https://api.themoviedb.org/3/guest_session/guest_session_id/rated/movies?language=en-US&page=1&sort_by=created_at.asc' \
 --header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721' \
 --header 'accept: application/json'

 curl --request GET \
 --url 'https://api.themoviedb.org/3/keyword/keyword_id/movies?include_adult=false&language=en-US&page=1' \
 --header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721' \
 --header 'accept: application/json'

 curl --request GET \
 --url 'https://api.themoviedb.org/3/movie/movie_id?language=en-US' \
 --header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721' \
 --header 'accept: application/json'


 curl --request GET \
 --url https://api.themoviedb.org/3/movie/movie_id/images \
 --header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721' \
 --header 'accept: application/json'

 curl --request GET \
 --url https://api.themoviedb.org/3/movie/movie_id/keywords \
 --header 'Authorization: Bearer 8e594be3048bf6c34bf75715defcb721' \
 --header 'accept: application/json'