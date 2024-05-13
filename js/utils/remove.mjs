async function deletePost(url, userData) {
  try {
    const token = localStorage.getItem("accessToken");
    const postData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    };
    const res = await fetch(url, postData);
    console.log(res);
    const json = await res.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

const deletePostUrl = `${API_BASE_URL}blog/posts/OlaNordmann/0b38358f-ae79-4fce-a31d-1cbdc98cbeac`;

/* deletePost(deletePostUrl); */
