import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent {
  posts: Post[] = [];
  currentPage = 1;
  postsPerPage = 5;
  totalPages: number = 0;
  editPost: Post = {} as Post;
  removePost: Post = {} as Post;
  showEditModal = false;
  showDeleteModal = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;

    this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts').subscribe(posts => {
      this.totalPages = Math.ceil(posts.length / this.postsPerPage);
      this.posts = posts.slice(startIndex, endIndex);
    });
  }
  openEditModal(post: Post) {
    this.editPost = { ...post };
    this.showEditModal = true;
  }

  openDeleteModal(post: Post) {
    this.removePost = post;
    this.showDeleteModal = true;
  }

  updatePost() {
    this.http.put<Post>(`https://jsonplaceholder.typicode.com/posts/${this.editPost.id}`, this.editPost)
      .subscribe(updatedPost => {
        const index = this.posts.findIndex(post => post.id === this.editPost.id);
        if (index !== -1) {
          this.posts[index] = updatedPost;
        }
        this.closeModal();
      }, error => {
        console.error('Error updating post:', error);
      });
  }

  deletePost() {
    this.http.delete(`https://jsonplaceholder.typicode.com/posts/${this.removePost.id}`)
      .subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== this.removePost.id);
        this.closeModal();
      }, error => {
        console.error('Error deleting post:', error);
      });
  }

  closeModal() {
    this.showEditModal = false;
    this.showDeleteModal = false;
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchPosts();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchPosts();
    }
  }
}
