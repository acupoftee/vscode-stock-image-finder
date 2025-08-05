type LoadingScreenProps = {
  page: number;
  pages: number;
};
export const LoadingScreen = ({ page, pages }: LoadingScreenProps) =>
  ` 
        <div class="image-grid">
            <p>Loading...</p>
            <div class="pagination-controls">
                <button id="prevBtn" disabled>Previous</button>
                <button id="nextBtn" disabled>Next</button>
            </div>
            <p>Page ${page} of ${pages}</p>
        </div>
  `;
